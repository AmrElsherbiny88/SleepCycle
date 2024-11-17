<script>
	import { goto } from '$app/navigation';
 
</script>


  
    <div
    class="w-full bg-opacity-50 bg-black z-50  text-white flex items-center justify-center xl:justify-between pb-2 xl:px-10 pt-6 md:pt-4 xl:pt-2"
  >
   
    <a class="hover:text-red-300 transition duration-200" href="https://amr-elsherbiny.vercel.app/"
  
      ><span>AmrElsherbiny</span></a
    >


    <div
      class="text-center xl:gap-20 text-sm xl:text-2xl md:text-xl flex bg-black bg-opacity-5 justify-around gap-3"
    >
    
      <a class="hover:text-red-300 transition duration-200" href="#Home"
      onclick={()=>goto('/Calculator')}
        ><span>Home</span></a
      >
      <a class="hover:text-red-300 transition duration-200" href="#Home"
      onclick={()=>goto('/History')}
        ><span>Home</span></a
      >

    </div>
  </div>

