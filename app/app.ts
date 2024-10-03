import { svelteNativeNoFrame } from 'svelte-native';
import App from './App.svelte';
import Splash from './components/Splash.svelte';

let started = false;

setTimeout(() => {
  started = true;
}, 2000); // Adjust the delay as needed

svelteNativeNoFrame(started ? App : Splash, {});
