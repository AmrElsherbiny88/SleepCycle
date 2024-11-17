<script>
	import { goto } from '$app/navigation';
    import {page} from "$app/stores";
</script>


  
    <div
    class="w-full bg-opacity-50 bg-black z-50 items-center text-white flex px-5 justify-between pb-2 xl:px-10 pt-6 md:pt-4 xl:pt-2 mb-5 mt-1" 
  >
   
    <a class="hover:text-red-300 transition duration-200 h3" href="https://amr-elsherbiny.vercel.app/"
  
      ><span>AmrElsherbiny</span></a
    >


    <div
      class="text-center xl:gap-20 text-sm xl:text-2xl md:text-xl flex bg-black bg-opacity-5 justify-around gap-3"
    >
    
      <a class="hover:text-red-300 transition duration-200" href="#"
      onclick={()=>goto('/Calculator')}
      class:active={$page.url.pathname === "/Calculator"}
        ><span>Calculator</span></a
      >
      <a class="hover:text-red-300 transition duration-200" href="#"
      onclick={()=>goto('/History')}
      class:active={$page.url.pathname === "/History"}
        ><span>History</span></a
      >

    </div>
  </div>

<style>
     .active {
    @apply variant-filled-primary px-3 rounded-md;
  }
</style>