<script lang="ts">
	import { resetTimer, progress } from '../data/service';
	export let strokeWidth: number = 4;
	export let sqSize: number = 160;

	const radius = (sqSize - strokeWidth) / 2;
	const dashArray = radius * Math.PI * 2;

	$: dashOffset = dashArray * $progress;

	let isComplete = false;
	let isCompleteReset = false;

	$: {
		isComplete = $progress === 1;
		if (isComplete) {
			setTimeout(() => {
				resetTimer();
				isCompleteReset = true;
			}, 500);
		}
	}
</script>

<svg
	width={sqSize}
	height={sqSize}
	viewBox={`0 0 ${sqSize} ${sqSize}`}
	class="circle-container {isCompleteReset ? 'completed' : ''}"
>
	<circle class="fill-none stroke-default" cx={sqSize / 2} cy={sqSize / 2} r={radius} stroke-width={strokeWidth} />

	<circle
		class="fill-none stroke-blue transition-all"
		cx={sqSize / 2}
		cy={sqSize / 2}
		r={radius}
		stroke-linecap="round"
		stroke-width={strokeWidth}
		transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
		style="stroke-dasharray: {dashArray}; stroke-dashoffset: {dashOffset};"
	/>
</svg>

<style src="./stopwatch.css"></style>
