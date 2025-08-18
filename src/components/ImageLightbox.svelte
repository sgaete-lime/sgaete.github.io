<script>
    import {fade} from 'svelte/transition';

    //props passed from astro
    export let imageSrc;
    export let title;
    export let desc;

    //component internal state
    export let isModalOpen = false;

    function openModal() {
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }

    function handleKeydown(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
        if (event.key === 'Enter' || event.key === ' ') {
            openModal();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div 
    on:click={openModal}
    on:keydown={handleKeydown}
    tabindex="0"
    role="button"
>
    <slot />
</div>

{#if isModalOpen}
<div class="lb-overlay" on:click|self={closeModal} transition:fade>
    <div class="lb-content">
        <img src={imageSrc} alt={title} />
        <div class="lb-sidebar">
            <h3>{title}</h3>
            <p>{desc}</p>
            <button on:click={closeModal}>Close</button>
        </div>
    </div>
</div>
{/if}

<style>
    .lb-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .lb-content {
        display: flex;
        max-width: 90%;
        max-height: 90%;
        gap: 2rem;
    }
    .lb-sidebar {
        color: white;
        width: 300px;
    }
    img {
        max-width: 100%;
        height: auto;
        object-fit: contain;
    }
</style>