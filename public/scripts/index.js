const $body = document.querySelector("body");
window.addEventListener("DOMContentLoaded", () => {
	$body.insertAdjacentHTML('afterbegin', `
		<div id="preload" class="preload preload-active">
			<picture class="preload__img img">
				<img src="./assets/logo.svg" alt="ONPE">
			</picture>
		</div>
	`)
});
window.addEventListener("load", () => {
	const $preload = document.querySelector("#preload");
	const $welcome = document.querySelector("#welcome");
	const $welcome_close = document.querySelector("#welcome-close");
	const $fieldset = document.querySelector(".login__inputs");
	setTimeout(() => {
		$body.classList.add("body-start");
		$preload.remove();
		$welcome.classList.add("modal--welcome");
		$welcome_close.addEventListener("click", () => {
			$welcome.classList.remove("modal--welcome");
		})
	}, 4100);
	window.addEventListener("keydown", (e) => {
		if (e.key == "Escape") {
			$welcome.classList.remove("modal--welcome");
		}
	});
	$fieldset.addEventListener("click", () => {
		$fieldset.childNodes.forEach((e) => {
			e.parentElement.querySelector("input").click();
		})
		
		// const $input = e.children
		// console.log($fieldset.children.item(1));
	})
});