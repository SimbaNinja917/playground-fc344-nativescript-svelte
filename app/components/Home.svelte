<page>
    <actionBar title="Home" />
    <gridLayout>
      <button text="Flashcards" class="button" on:tap="{goToFlashcards}" />
    </gridLayout>
</page>

<script lang="ts">
  import { navigate } from 'svelte-native';  // Correct import
  import Flashcards from './Flashcards.svelte';  // Import your target component

  function goToFlashcards() {
    navigate({ page: Flashcards });  // Use `navigate` with the correct configuration
  }
</script>

<style>
  .button {
    font-size: 20px;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border-radius: 10px;
    text-align: center;
  }
</style>
