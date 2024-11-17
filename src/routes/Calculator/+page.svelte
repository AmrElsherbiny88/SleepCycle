<script>
  import Cookies from 'js-cookie';
  import { onMount } from 'svelte';

  let sleepTime = $state('');
  let wakeUpTimes = $state([]);

  let history = $state([]);
  let suggestedWakeUpTimes = $state([]);


  $effect(() => {
    const savedHistory = Cookies.get('sleepCycles');
    history = savedHistory ? JSON.parse(savedHistory) : [];
    const savedSuggestedWakeUpTimes = Cookies.get('suggestedWakeUpTimes');
    suggestedWakeUpTimes = savedSuggestedWakeUpTimes ? JSON.parse(savedSuggestedWakeUpTimes) : [];
  });

  const calculateWakeTimes = () => {
    if (!sleepTime) return alert('Please enter a valid sleep time!');

    const sleep = new Date(`1970-01-01T${sleepTime}:00`);
    wakeUpTimes = [];

    for (let i = 1; i <= 6; i++) {
      const wake = new Date(sleep.getTime() + i * 90 * 60000);
      const type = i === 1 ? 'Light → Deep' : i === 6 ? 'Light → REM' : 'Light → Deep → REM';
      wakeUpTimes.push({ time: wake.toTimeString().slice(0, 5), cycle: type });
    }


    suggestedWakeUpTimes = wakeUpTimes;
    Cookies.set('suggestedWakeUpTimes', JSON.stringify(suggestedWakeUpTimes));

  
    const newEntry = { sleepTime, wakeUpTimes, date: new Date().toLocaleString() };
    history = [...history, newEntry];
    Cookies.set('sleepCycles', JSON.stringify(history));
  };

  const wakeUp = () => {
    Cookies.remove('suggestedWakeUpTimes');
    suggestedWakeUpTimes = []; 
  };

  
</script>

<style>

</style>

<main>
  <h1 class="h1 mb-5 mt-5">Sleep Cycle Calculator</h1>

  <div>
    <label>
      Sleep Time:
      <input class="overflow-hidden border-none outline-none" type="time" bind:value={sleepTime} />
    </label>
    <button class="bg-red-600 px-5 py-1 rounded-md mt-5 mb-5 hover:bg-red-950" onclick={calculateWakeTimes}>Calculate</button>
  </div>

  {#if suggestedWakeUpTimes.length > 0}
    <h2> Wake-Up Times</h2>
    <ul class="mt-5 mb-3">
      {#each suggestedWakeUpTimes as { time, cycle }}
        <li class="mt-2">
       <span class="mt-5 h3">   Wake up at <strong>{time}</strong> during <em>{cycle}</em></span>
        </li>
      {/each}
    </ul>
    <button class="bg-red-600 px-5 py-1 rounded-md mt-5 hover:bg-red-950" onclick={wakeUp}>I Woke Up</button>
  {/if}

 
</main>
