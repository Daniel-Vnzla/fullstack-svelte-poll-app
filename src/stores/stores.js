import { writable } from 'svelte/store';

export const api = 'https://poll-app-api-js.herokuapp.com';
export let userData = writable({});
export let storePolls = writable([]);
export let storeOwnPolls = writable([]);