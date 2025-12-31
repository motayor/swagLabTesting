import { Page } from "@playwright/test";


export async function waitFor(x: number) {
    const waitOut = x * 1000;
    await new Promise(resolve => setTimeout(resolve, waitOut));
}