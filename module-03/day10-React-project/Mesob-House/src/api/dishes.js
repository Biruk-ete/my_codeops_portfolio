import { menuItems } from '../data/menuData';

const simulateDelay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDishes = async () => {
    await simulateDelay(700);
    return menuItems;
};

export const fetchDishById = async (id) => {
    await simulateDelay(500);
    const dish = menuItems.find((d) => d.id === id);
    if (!dish) {
        throw new Error(`Dish "${id}" not found`);
    }
    return dish;
};

export const fetchFeaturedDishes = async (limit = 4) => {
    await simulateDelay(600);
    return menuItems.slice(0, limit);
};

export const fetchCategories = async () => {
    await simulateDelay(300);
    const counts = {};
    menuItems.forEach((item) => {
        counts[item.category] = (counts[item.category] || 0) + 1;
    });

    return [
        { name: 'All Dishes', count: menuItems.length },
        ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
};