<script>
  import Cookies from 'js-cookie';
  import { onMount } from 'svelte';

  let history = [];


  onMount(() => {
    const savedHistory = Cookies.get('sleepCycles');
    history = savedHistory ? JSON.parse(savedHistory) : [];
  });

  
  const deleteEntry = (index) => {
    history = history.filter((_, i) => i !== index); 
    Cookies.set('sleepCycles', JSON.stringify(history));
  };


  const clearHistory = () => {
    history = []; 
    Cookies.remove('sleepCycles');
  };
</script>

<style>
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
  <h1>Sleep Cycle History</h1>

  {#if history.length === 0}
    <p>No history available.</p>
  {/if}

  {#each history.reverse() as { sleepTime, wakeUpTimes, date }, index}
    <div class="history-entry">
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Sleep Time:</strong> {sleepTime}</p>
      <p><strong>Wake-Up Times:</strong></p>
      <ul>
        {#each wakeUpTimes as { time, cycle }}
          <li>{time}: {cycle}</li>
        {/each}
      </ul>
      <button onclick={() => deleteEntry(index)}>Delete</button>
    </div>
  {/each}

  {#if history.length > 0}
    <button class="clear-button" onclick={clearHistory}>Clear All History</button>
  {/if}
</main>
