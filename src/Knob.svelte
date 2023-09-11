<script>
	export let value, min, max
	export let rotRange = 2 * Math.PI * 0.83
	export let pixelRange = 200
	export let startRotation = -Math.PI * 0.83
	export let color = "#123456"
	export let size = 32
	
	let startY, startValue
	let turning = false
	let oldValue = 0
	let radius = 0.0
	let valueRange

	$: oldValue = min
	$: valueRange = max - min
	$: rotation = startRotation + (value - min) / valueRange * rotRange
	$: radius = size / 2

	function clamp(num, min, max) {
		return Math.max(min, Math.min(num, max))
	}
	
	function pointerMove({ clientY }) {
		turning = true
		const valueDiff = valueRange * (clientY - startY) / pixelRange
		value = clamp(startValue - valueDiff, min, max)
	}
	
	function pointerDown({ clientY }) {
		startY = clientY
		startValue = value
		window.addEventListener('pointermove', pointerMove)
		window.addEventListener('pointerup', pointerUp)
	}
	
	function pointerUp() {
		window.removeEventListener('pointermove', pointerMove)
		window.removeEventListener('pointerup', pointerUp)
	}
	//toggle on - off
	function click() {
		if (turning == false) {
			if (oldValue == max) {
				oldValue = min
			} else {
				oldValue = max
			}
			value = oldValue
		}
		turning = false
	}
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="box">
	<svg class="knob" viewBox="0 0 {size} {size}" width={size} height={size} style="--rotation: {rotation}" 
		on:click={click} on:pointerdown={pointerDown}>
		<circle cx="{radius}" cy="{radius}" r="{radius - 1}" stroke="#cccccc" stroke-width="2" fill={color} />    
		<rect x="{radius-2}" y="1" width="4" height="14" fill="#dddddd" />
	</svg>
</div>	
<style>
	.box {
		filter: drop-shadow(2px 2px 2px #000000);
	}
	.knob {
		display: block;
		padding: 0;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
		transform-origin: 50% 50%;
	}
</style>