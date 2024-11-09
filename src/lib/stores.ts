import { writable } from 'svelte/store';

export const selection$ = writable<string>("");

export const xsd$ = writable<HTMLElement | null>(null);