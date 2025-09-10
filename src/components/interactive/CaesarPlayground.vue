<script setup>
import { alphabet, RotN } from "@/algorithms/caesar-cipher";
import { computed, nextTick, ref } from "vue";

const text = ref("");
const key = ref(0);
const decipherMode = ref(true);
const rotN = new RotN(alphabet);

const encrypted = computed(() =>
  decipherMode.value
    ? rotN.decode(text.value, Number(key.value))
    : rotN.encode(text.value, Number(key.value)),
);

const handleInput = (e) => {
  text.value = e.target.value;
};

const bruteLines = ref([]);

async function openBruteDialog() {
  bruteLines.value = Array.from({ length: alphabet.length }, (_, k) => ({
    key: k,
    text: decipherMode.value
      ? rotN.decode(text.value, k)
      : rotN.encode(text.value, k),
  }));

  await nextTick();
  window.bruteforceDialog.show();
}
</script>

<template>
  <div class="playground">
    <dialog class="bruteforce-dialog" id="bruteforceDialog">
      <button
        class="close-button"
        type="button"
        onclick="window.bruteforceDialog.close()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <h3 class="dialog-heading">
        Перебор всего алфавита всего {{ alphabet.length }} ключей
      </h3>

      <div class="bruteforce-list">
        <div v-for="{ key, text } in bruteLines">
          <div class="key-info">Ключ: {{ key }}</div>
          <div class="key-message">{{ text ? text : "-" }}</div>
        </div>
      </div>
    </dialog>

    <div class="fields">
      <div class="info">Оригинальный текст:</div>

      <textarea
        placeholder="Введите текст"
        class="textarea field"
        :value="text"
        @input="handleInput"
        name="textarea"
        id="textarea"
      ></textarea>

      <div class="info">Зашифрованный текст:</div>

      <pre class="encrypted field">{{ encrypted }}</pre>
    </div>

    <div class="controls">
      <div class="key">
        <div class="key-info">Ключ: {{ key }}</div>
        <input
          class="range-input"
          v-model="key"
          type="range"
          id="key"
          name="key"
          min="0"
          :max="alphabet.length - 1"
        />
      </div>

      <label class="mode" for="decipher-mode">
        <input v-model="decipherMode" id="decipher-mode" type="checkbox" />
        <span class="mode-name">{{
          decipherMode ? "Режим расшифровки" : "Режим зашифровки"
        }}</span>
      </label>

      <button @click="openBruteDialog" class="bruteforce" type="button">
        Перебор всего алфавита
      </button>
    </div>
  </div>
</template>

<style scoped>
.playground {
  position: relative;
  margin: 0.5rem 0;
  border: 3px solid var(--secondary);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.bruteforce-dialog {
  top: 0;
  border-radius: inherit;
  background-color: var(--background);
  padding: inherit;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  color: var(--text);
}

.fields {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.range-input {
  width: 100%;
}

.field {
  width: 100%;
  min-height: 4lh;
  font-family: "Courier New", Courier, monospace;
  word-break: break-all;
  field-sizing: content;
  border: 2px solid var(--secondary);
  border-radius: 4px;
}

.textarea {
  appearance: none;
  background: none;
  field-sizing: content;
  resize: none;
  color: inherit;

  &:focus {
    box-shadow: 0 0 0 2px var(--secondary);
    border: 2px solid var(--secondary);
  }
}

.encrypted {
  color: var(--text-secondary);
  white-space: pre-wrap;
  word-break: break-all;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.key {
  width: 100%;
}

.key-info {
  text-wrap: nowrap;
}

.info {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.mode {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mode-name {
  text-wrap: nowrap;
}

.bruteforce {
  margin-top: 0.5rem;
  border: 2px solid var(--secondary);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: var(--secondary);
  }
}

.close-button {
  position: sticky;
  top: 0;
  left: 100%;
  opacity: 0.5;
  z-index: 1;
  margin-left: auto;
  border: 2px solid var(--secondary);
  border-radius: 5px;
  padding: 0.25rem;

  &:hover {
    opacity: 1;
    cursor: pointer;
    background-color: var(--secondary);
  }
}

.bruteforce-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dialog-heading {
  margin-bottom: 0.5rem;
}

.key-info {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.key-message {
  border: 2px solid var(--secondary);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  word-break: break-all;
}

@media (max-width: 600px) {
  .playground {
    grid-template-columns: 1fr;
  }

  .fields {
    grid-template-columns: 1fr;
    grid-auto-flow: row;
  }
}
</style>
