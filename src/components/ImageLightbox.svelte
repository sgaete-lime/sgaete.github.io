<script>
    import { fade } from 'svelte/transition';

    export let media = []; 
    export let title;
    export let desc;

    let isModalOpen = false;
    let currentIndex = 0;

    function openModal(index = 0) {
        currentIndex = index;
        isModalOpen = true;
        preloadAdjacent(index);
    }
    function closeModal() {
        isModalOpen = false;
    }
    function next() {
        currentIndex = (currentIndex + 1) % media.length;
        preloadAdjacent(currentIndex);
    }
    function prev() {
        currentIndex = (currentIndex - 1 + media.length) % media.length;
        preloadAdjacent(currentIndex);
    }
    function goToSlide(index) {
        currentIndex = index;
        preloadAdjacent(index);
    }

    function handleKeydown(event) {
        if (!isModalOpen) return;
        if (event.key === 'Escape') closeModal();
        if (event.key === 'ArrowRight') next();
        if (event.key === 'ArrowLeft') prev();
    }

    // ✅ Preload the next/prev images (but not videos/iframes)
    function preloadAdjacent(index) {
        const nextIndex = (index + 1) % media.length;
        const prevIndex = (index - 1 + media.length) % media.length;

        [nextIndex, prevIndex].forEach(i => {
            const item = media[i];
            if (item && item.type === "image") {
                const img = new Image();
                img.src = item.src;
            }
        });
    }

    // Optional: preload everything on hover/focus of the project card
    function preloadAll() {
        for (const item of media) {
            if (item.type === "image") {
                const img = new Image();
                img.src = item.src;
            }
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Trigger -->
<div 
    on:click={() => openModal(0)}
    on:keydown={(e) => e.key === 'Enter' && openModal(0)}
    on:mouseenter={preloadAll}
    on:focus={preloadAll}
    tabindex="0"
    role="button"
>
    <slot />
</div>

<!-- Modal -->
{#if isModalOpen}
<div class="lb-overlay" on:click|self={closeModal} transition:fade>
    <div class="lb-content">
        <div class="lb-main">
            {#if media[currentIndex].type === 'image'}
                <img src={media[currentIndex].src} alt={title} />
            {:else if media[currentIndex].type === 'video'}
                <iframe
                    width="960"
                    height="512"
                    src={media[currentIndex].src}
                    title={title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            {/if}

            {#if media.length > 1}
                <button class="nav prev" on:click|stopPropagation={prev}>‹</button>
                <button class="nav next" on:click|stopPropagation={next}>›</button>

                <!-- dots -->
                <div class="dots">
                    {#each media as item, i}
                        <button
                            class="dot {item.type} {i === currentIndex ? 'active' : ''}"
                            on:click|stopPropagation={() => goToSlide(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        ></button>
                    {/each}
                </div>
            {/if}
        </div>

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
        inset: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .lb-content {
        display: flex;
        align-items: center;
        max-width: 80vw;
        max-height: 80vh;
        gap: 2rem;
        position: relative;
    }
    .lb-main {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    img, iframe {
        max-width: 60vw;
        max-height: 70vh;
        object-fit: contain;
        border: white;
        border-style:solid;
        border-radius: 6px;
    }
    .nav {
        position: absolute;
        bottom: -6%;
        transform: translateY(0%);
        background: rgba(0,0,0,0.6);
        border: none;
        color: white;
        font-size: 2rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 8px;
    }
    .nav.prev { left: 0rem; }
    .nav.next { right: 0.5rem; }

    /* dots */
    .dots {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 1rem;
    }
    .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    padding: 0;             /* remove extra button padding */
    margin: 0;
    background: #aaa;
    opacity: 0.7;
    cursor: pointer;
    line-height: 0;         /* prevent text baseline stretch */
}
    .dot.active {
        background: white;
        opacity: 1;
    }
    .dot.video {
        background: #e63946; /* red for YouTube videos */
    }
    .dot.video.active {
        background: #ff6b6b;
    }

    .lb-sidebar {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        width: 300px;
        flex-shrink: 0;
        border-radius: 6px;
        padding: 1.5rem;
    }
</style>
