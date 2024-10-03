<script lang="ts">
    type Flashcard = { id: number; question: string; answer: string; audio_url: string };
    type CardProgress = { card_id: number; correct: boolean; last_attempted_at: string };
  
    let flashcards: Flashcard[] = [
      { id: 1, question: 'Omena', answer: 'Apple', audio_url: 'https://api2.finnishcompanion.com/speak?term=omena&lang=fi' },
      { id: 2, question: 'Koira', answer: 'Dog', audio_url: 'https://api2.finnishcompanion.com/speak?term=koira&lang=fi' },
      { id: 3, question: 'Talo', answer: 'House', audio_url: 'https://api2.finnishcompanion.com/speak?term=talo&lang=fi' }
    ];
  
    let currentIndex: number = 0;
    let isFlipped: boolean = false;
    let sessionComplete: boolean = false;
    let results: { cards_progress: CardProgress[] } = { cards_progress: [] };
  
    function playAudio(audio_url: string): void {
      const audio = new Audio(audio_url);
      audio.play();
    }
  
    function toggleFlip(): void {
      isFlipped = !isFlipped;
    }
  
    function markResponse(correct: boolean): void {
      results.cards_progress.push({
        card_id: flashcards[currentIndex].id,
        correct,
        last_attempted_at: new Date().toISOString()
      });
      if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        isFlipped = false;
      } else {
        sessionComplete = true;
      }
    }
  
    function restartSession(): void {
      currentIndex = 0;
      isFlipped = false;
      sessionComplete = false;
      results.cards_progress = [];
    }
  </script>
  
  <style>
    .card-container { display: flex; justify-content: center; align-items: center; height: 100vh; }
    .card { width: 300px; height: 400px; position: relative; cursor: pointer; perspective: 1000px; }
    .card-inner { position: absolute; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
    .card.flipped .card-inner { transform: rotateY(180deg); }
    .card-front, .card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; justify-content: center; align-items: center; border: 2px solid #3498db; font-size: 1.5em; font-weight: bold; border-radius: 10px; }
    .card-front { background-color: #fff; color: #3498db; }
    .card-back { background-color: #3498db; color: #fff; transform: rotateY(180deg); }
    .results { text-align: center; }
    button { margin-top: 20px; padding: 10px 20px; font-size: 1.2em; cursor: pointer; }
  </style>
  
  {#if sessionComplete}
    <div class="results">
      <h2>Session Complete!</h2>
      <ul>
        {#each results.cards_progress as progress}
          <li>Card {progress.card_id}: {progress.correct ? 'Known' : 'Unknown'}</li>
        {/each}
      </ul>
      <button on:tap={restartSession}>Restart</button>
    </div>
  {:else}
    <div class="card-container">
      <div class="card" class:flipped={isFlipped} on:tap={toggleFlip}>
        <div class="card-inner">
          <div class="card-front" on:tap={() => playAudio(flashcards[currentIndex].audio_url)}>
            {flashcards[currentIndex].question}
          </div>
          <div class="card-back">
            {flashcards[currentIndex].answer}
          </div>
        </div>
      </div>
      <button on:tap={() => markResponse(true)}>Mark as Known</button>
      <button on:tap={() => markResponse(false)}>Mark as Unknown</button>
    </div>
  {/if}
  