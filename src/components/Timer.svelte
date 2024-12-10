<script lang="ts">
	import { inputTime, isRunning, handleInput, toggleTimer, resetTimer, isInputValid } from '../data/service';
	import ProgressCircle from './ProgressCircle.svelte';
</script>

<div class="backgroundpicture"></div>

<div class="outer-container">
	<div class="container">
		<div class="timer-heading">Timer</div>

		<ProgressCircle strokeWidth={8} sqSize={160} />

		<input
			class="timer-input {!$isInputValid ? 'invalid' : ''}"
			type="numeric"
			bind:value={$inputTime}
			on:input={handleInput}
			disabled={$isRunning}
			min="0"
			placeholder="0 s"
		/>
		<div
			on:click={toggleTimer}
			on:keydown={e => {
				if (e.key === 'Enter' || e.key === ' ') toggleTimer();
			}}
			role="button"
			tabindex="0"
			class="start-pause-image"
			aria-label="Start or Pause Timer"
		>
			<img
				src={$isRunning ? '/src/assets/Icon-material-pause.png' : '/src/assets/Icon-material-play-arrow.png'}
				alt="Start or Pause Timer"
			/>
		</div>

		<div
			on:click={resetTimer}
			on:keydown={e => {
				if (e.key === 'Enter' || e.key === ' ') resetTimer();
			}}
			role="button"
			tabindex="0"
			class="reset"
			aria-label="Reset Timer"
		>
			reset
		</div>
	</div>
</div>

<style src="./stopwatch.css"></style>
