<script>
  import Cookies from "js-cookie";

  let sleepTime = $state(""); 
  let sleepPeriod = $state("PM"); 
  let wakeUpTimes = $state([]); 
  let history = $state([]); 
  let suggestedWakeUpTimes = $state([]); 

  const to12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const newHours = hours % 12 || 12;
    const newMinutes = minutes.toString().padStart(2, "0");
    return `${newHours}:${newMinutes} ${ampm}`;
  };

  const adjustSleepTime = () => {
    if (!sleepTime) return null;

    const timeParts = sleepTime.split(":");
    let hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];

    if (sleepPeriod === "AM") {
     
      if (hours === 12) {
        hours = 0;
      }
    } else if (sleepPeriod === "PM") {
  
      if (hours < 12) {
        hours += 12;
      }
    }

    return `${hours}:${minutes}`;
  };

  $effect(() => {
    const savedHistory = Cookies.get("sleepCycles");
    history = savedHistory ? JSON.parse(savedHistory) : [];
    const savedSuggestedWakeUpTimes = Cookies.get("suggestedWakeUpTimes");
    suggestedWakeUpTimes = savedSuggestedWakeUpTimes
      ? JSON.parse(savedSuggestedWakeUpTimes)
      : [];
  });

  const calculateWakeTimes = () => {
    if (!sleepTime) return alert("Please enter a valid sleep time!");

    const adjustedSleepTime = adjustSleepTime();
    if (!adjustedSleepTime) return alert("Sleep time is invalid!");

    const sleep = new Date(`1970-01-01T${adjustedSleepTime}:00`);
    wakeUpTimes = [];
    const currentDate = new Date().toLocaleDateString();

    for (let i = 1; i <= 6; i++) {
      const wake = new Date(sleep.getTime() + i * 90 * 60000);
      const type =
        i === 1
          ? "Light → Deep"
          : i === 6
          ? "Light → REM"
          : "Light → Deep → REM";
      const wakeTime = wake.toTimeString().slice(0, 5);
      const formattedWakeTime = to12HourFormat(wakeTime);
      wakeUpTimes.push({
        time: formattedWakeTime,
        cycle: type,
        date: currentDate,
      });
    }

    suggestedWakeUpTimes = wakeUpTimes;
    Cookies.set("suggestedWakeUpTimes", JSON.stringify(suggestedWakeUpTimes));

    const newEntry = {
      sleepTime,
      wakeUpTimes,
      date: new Date().toLocaleString(),
    };
    history = [...history, newEntry];
    Cookies.set("sleepCycles", JSON.stringify(history));
  };

  const wakeUp = () => {
    Cookies.remove("suggestedWakeUpTimes");
    suggestedWakeUpTimes = [];
  };
</script>

<main>
  <h1 class="h1 mb-5 mt-5">Sleep Cycle Calculator</h1>

  <div>
    <label>
      Sleep Time:
      <input
        class="overflow-hidden rounded-md border-none outline-none"
        type="time"
        bind:value={sleepTime}
      />
      <select
        class="overflow-hidden rounded-md text-black border-none outline-none"
        bind:value={sleepPeriod}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </label>

    <button
      class="bg-red-600 px-5 py-1 rounded-md mt-5 mb-5 hover:bg-red-950"
      onclick={calculateWakeTimes}>Calculate</button>
  </div>

  <section>
    {#if suggestedWakeUpTimes.length > 0}
    <h2>Wake-Up Times</h2>

    <ul class="mt-5 mb-3">
      <span class="h4">Wake up at:</span>
      {#each suggestedWakeUpTimes as { time, cycle, date }}
        <li class="mt-2">
          <span class="mt-5 h3">
            <strong>{time}</strong> during <em>{cycle}</em>
          </span>
        </li>
      {/each}
    </ul>
    <button
      class="bg-red-600 px-5 py-1 rounded-md mt-5 hover:bg-red-950"
      onclick={wakeUp}>I Woke Up</button>
    {/if}
  </section>
</main>

<style>

</style>
