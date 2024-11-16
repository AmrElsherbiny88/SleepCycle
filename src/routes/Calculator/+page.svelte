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
  .wake-time {
    margin: 10px 0;
  }

  .history-entry {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: darkred;
  }

  .clear-button {
    margin-top: 20px;
    background-color: blue;
  }

  .clear-button:hover {
    background-color: darkblue;
  }
</style>

<main>
  <h1>Sleep Cycle Calculator</h1>

  <div>
    <label>
      Sleep Time:
      <input type="time" bind:value={sleepTime} />
    </label>
    <button onclick={calculateWakeTimes}>Calculate</button>
  </div>

  {#if suggestedWakeUpTimes.length > 0}
    <h2>Suggested Wake-Up Times</h2>
    <ul>
      {#each suggestedWakeUpTimes as { time, cycle }}
        <li class="wake-time">
          Wake up at <strong>{time}</strong> during <em>{cycle}</em>
        </li>
      {/each}
    </ul>
    <button onclick={wakeUp}>I Woke Up</button>
  {/if}

 
</main>
