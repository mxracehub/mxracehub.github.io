
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { triviaQuestions, type TriviaQuestion } from '@/lib/trivia-data';
import type { Account } from '@/lib/types';
import { updateAccount } from '@/lib/firebase-config';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TriviaGameProps {
  userAccount: Account;
  onGameEnd: () => void;
}

// Function to shuffle an array and take the first N items
const shuffleAndTake = <T,>(array: T[], numItems: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
};

const QUESTION_TIME = 10; // seconds
const NUM_QUESTIONS = 7;
const REWARD_AMOUNT = 100;

export function TriviaGame({ userAccount, onGameEnd }: TriviaGameProps) {
  const { toast } = useToast();
  const [sessionQuestions, setSessionQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [blurCount, setBlurCount] = useState(0);
  const [isDisqualified, setIsDisqualified] = useState(false);

  useEffect(() => {
    // Filter out questions that have already been played.
    const playedIds = userAccount.playedTriviaIds || [];
    let availableQuestions = triviaQuestions.filter(q => !playedIds.includes(q.id));

    // If the user has played all available questions, reset their progress.
    // They can play again from the full pool.
    if (availableQuestions.length < NUM_QUESTIONS) {
        availableQuestions = triviaQuestions;
    }

    setSessionQuestions(shuffleAndTake(availableQuestions, NUM_QUESTIONS));
    
    // Attempt to lock screen orientation on mobile
    try {
        if (screen.orientation && 'lock' in screen.orientation) {
            screen.orientation.lock('portrait-primary').catch(() => {});
        }
    } catch (error) {
        console.warn("Screen orientation lock not supported.");
    }

    return () => {
        // Attempt to unlock screen orientation when component unmounts
        if (screen.orientation && 'unlock' in screen.orientation) {
             screen.orientation.unlock();
        }
    }
  }, [userAccount.playedTriviaIds]);

  // Timer logic
  useEffect(() => {
    if (isAnswered || gameState !== 'playing' || isDisqualified) return;

    if (timeLeft === 0) {
      handleAnswerSelect(null); // Time's up
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, gameState, isDisqualified]);

  // Anti-cheat: blur detection
  useEffect(() => {
    const handleBlur = () => {
      if (gameState !== 'playing') return;

      const newBlurCount = blurCount + 1;
      setBlurCount(newBlurCount);

      if (newBlurCount === 1) {
        toast({
          variant: 'destructive',
          title: 'Warning: Focus Lost',
          description: 'Switching tabs or minimizing will disqualify you. Stay focused!',
        });
      } else if (newBlurCount >= 2) {
        setIsDisqualified(true);
        setGameState('finished');
      }
    };
    
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [blurCount, gameState, toast]);

  const handleAnswerSelect = (answer: string | null) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    if (answer && answer === sessionQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < sessionQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsAnswered(false);
        setSelectedAnswer(null);
        setTimeLeft(QUESTION_TIME);
      } else {
        setGameState('finished');
      }
    }, 2000); // 2-second delay to show correct/incorrect answer
  };

  const handleFinishGame = useCallback(async () => {
    let finalToastTitle = 'Trivia Complete!';
    let finalToastDesc = `You scored ${score} out of ${sessionQuestions.length}.`;
    
    const playedInThisSessionIds = sessionQuestions.map(q => q.id);
    const existingPlayedIds = userAccount.playedTriviaIds || [];
    let nextPlayedTriviaIds = [...new Set([...existingPlayedIds, ...playedInThisSessionIds])];

    if (nextPlayedTriviaIds.length >= triviaQuestions.length) {
        nextPlayedTriviaIds = []; // Reset for next cycle
    }

    const updates: Partial<Account> = {
      lastTriviaPlayed: new Date().toISOString(),
      playedTriviaIds: nextPlayedTriviaIds,
    };

    if (score > 0 && !isDisqualified) {
      const newGoldBalance = (userAccount.balances.gold || 0) + REWARD_AMOUNT;
      updates.balances = { ...userAccount.balances, gold: newGoldBalance };
      finalToastTitle = 'You Won!';
      finalToastDesc = `You scored ${score}/${sessionQuestions.length} and won ${REWARD_AMOUNT} Gold Coins!`;
    } else if (isDisqualified) {
        finalToastTitle = 'Disqualified';
        finalToastDesc = 'You were disqualified for leaving the tab. No prize awarded.';
    }

    try {
      await updateAccount(userAccount.id, updates);
      toast({
        title: finalToastTitle,
        description: finalToastDesc,
      });
    } catch (error) {
      console.error("Failed to update account after trivia", error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save your trivia results. Please try again later.',
      });
    } finally {
      onGameEnd();
    }
  }, [score, sessionQuestions, userAccount, onGameEnd, toast, isDisqualified]);
  
  useEffect(() => {
    if (gameState === 'finished') {
        handleFinishGame();
    }
  }, [gameState, handleFinishGame])

  if (sessionQuestions.length === 0) {
    return null; // Don't render anything until questions are loaded
  }

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;
  const timeProgress = (timeLeft / QUESTION_TIME) * 100;
  
  const getButtonClass = (option: string) => {
      if (!isAnswered) return 'bg-muted hover:bg-muted/80';
      if (option === currentQuestion.correctAnswer) return 'bg-green-600 hover:bg-green-700';
      if (option === selectedAnswer) return 'bg-red-600 hover:bg-red-700';
      return 'bg-muted opacity-50';
  }

  return (
    <Dialog open={true}>
      <DialogContent 
        className="max-w-2xl text-foreground" 
        hideCloseButton 
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: 'none' }}
      >
        {gameState === 'playing' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">MxHub Trivia Challenge!</DialogTitle>
              <DialogDescription className="text-center">
                Question {currentQuestionIndex + 1} of {sessionQuestions.length}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Progress value={timeProgress} className="h-2 mb-4" />

                {currentQuestion.type === 'image' && currentQuestion.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden aspect-video relative">
                        <Image
                            src={currentQuestion.imageUrl}
                            alt={currentQuestion.imageHint || 'Trivia Image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
                <p className="text-lg font-semibold text-center mb-6">{currentQuestion.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswered}
                            className={cn("h-auto py-3 text-base whitespace-normal justify-start text-left", getButtonClass(option))}
                        >
                            <span className="mr-4 font-bold">{String.fromCharCode(65 + index)}</span>
                            <span>{option}</span>
                             {isAnswered && option === currentQuestion.correctAnswer && <CheckCircle className="ml-auto"/>}
                             {isAnswered && option === selectedAnswer && option !== currentQuestion.correctAnswer && <XCircle className="ml-auto"/>}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <Progress value={progressPercentage} />
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold mb-4">Calculating Results...</h2>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
