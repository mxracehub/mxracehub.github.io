
import { manufacturersPoints as data } from './manufacturers-points-data';

export type ManufacturerPoints = {
    pos: number;
    manufacturer: string;
    points: number;
};

export const getManufacturersPoints = (): ManufacturerPoints[] => {
    // In a real application, this would fetch and calculate points dynamically.
    // For this demonstration, we're returning a static list.
    return data;
};
