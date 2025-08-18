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
        align-items: center;
        max-width: 60vw;
        max-height: 60vh;
        gap: 3rem;
    }
    .lb-sidebar {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        width: 300px;
        flex-shrink: 0;
        border-radius: 6px;
        padding: 1.5rem;
    }
    img {
        max-width: 80vw;
        max-height: 80vh;
        object-fit: contain;
    }
</style>