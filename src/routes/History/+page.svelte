<script>
  import Cookies from "js-cookie";
  import {onMount} from "svelte";

  let history = [];

  onMount(() => {
    const savedHistory = Cookies.get("sleepCycles");
    history = savedHistory ? JSON.parse(savedHistory) : [];
  });

  const deleteEntry = (index) => {
    history = history.filter((_, i) => i !== index);
    Cookies.set("sleepCycles", JSON.stringify(history));
  };

  const clearHistory = () => {
    history = [];
    Cookies.remove("sleepCycles");
  };
</script>

<main>
  <h1 data-aos="fade-up" class="h1">Sleep Cycle History</h1>

  {#if history.length === 0}
    <p class="mt-5">No history available.</p>
  {/if}

  {#if history.length > 0}
    <button
    data-aos="fade-up"
      class="bg-blue-600 px-5 py-1 rounded-md mt-10 mb-5 hover:bg-blue-950"
      onclick={clearHistory}>Clear All History</button
    >
  {/if}

  {#each history.reverse() as { sleepTime, wakeUpTimes, date }, index}
    <div data-aos="fade-right" class="history-entry mt-10">
      <p><strong>Date:</strong> {date}</p>
      <p class="h3"><strong>Sleep Time:</strong> {sleepTime}</p>
      <p class="mt-3 mb-3"><strong>Wake-Up Times:</strong></p>
      <ul>
        {#each wakeUpTimes as { time, cycle }}
          <li class="h3">{time}: {cycle}</li>
        {/each}
      </ul>
      <button
        class="bg-red-600 px-5 py-1 rounded-md mt-5 mb-5 hover:bg-red-950"
        onclick={() => deleteEntry(index)}>Delete</button
      >
    </div>
  {/each}
</main>

<style>
</style>
