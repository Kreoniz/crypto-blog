<script setup>
import { alphabet, rotN } from "@/algorithms/caesar-cipher";
import { computed, ref } from "vue";

const text = ref("");
const key = ref(0);
const cipherMode = ref(true);

const encrypted = computed(() =>
  rotN(text.value, Number(key.value), cipherMode.value),
);

const handleInput = (e) => {
  text.value = e.target.value;
};
</script>

<template>
  <div class="playground">
    <div class="fields">
      <div>
        <div class="info">Оригинальный:</div>

        <textarea
          placeholder="Введите текст"
          class="textarea field"
          :value="text"
          @input="handleInput"
          name="textarea"
          id="textarea"
        ></textarea>
      </div>

      <div>
        <div class="info">Зашифрованный текст:</div>

        <pre class="encrypted field">{{ encrypted }}</pre>
      </div>
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
        <input v-model="cipherMode" id="decipher-mode" type="checkbox" />
        <span class="mode-name">{{
          cipherMode ? "Режим расшифровки" : "Режим зашифровки"
        }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.playground {
  margin: 0.5rem 0;
  border: 3px solid var(--secondary);
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
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

@media (max-width: 600px) {
  .playground {
    grid-template-columns: 1fr;
  }

  .fields {
    grid-template-columns: 1fr;
  }
}
</style>
