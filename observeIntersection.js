import { scrollLIIntoView } from "./scroll.js";
import { closestLI } from "./closestLI.js";

function observeIntersection() {
	const list = document.querySelector(".list");
	const listItems = list.childNodes;
	// console.log(listItems);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				entry.target.classList.toggle("is-intersecting", !entry.isIntersecting);
				// console.log(entry);
			});

			// NOT SURE IF BENEFIT TO USING "list" OVER document (PROB LESS ERROR-PRONE)
			list.addEventListener("click", focusOnEntry);
			// SHOULD MAYBE DO ARROW FUNCTION
			function focusOnEntry(e) {
				// THINK I COULD USE GUARD CLAUSE. NOT SURE I WANT TO
				if (
					e.target.matches(
						".collapsible, .block, .redirect, .redirect-url, .url-button"
					)
					// URL BUTTON ALREADY SCROLLS ON FOCUS, SO MAY WANT TO TAKE OUT
				) {
					setTimeout(() => {
						// IDEALLY WOULD LIKE TO DO WITHOUT USING A CLASS
						if (closestLI(e)().classList.contains("is-intersecting")) {
							scrollLIIntoView(closestLI(e)());
						}
					}, 410);
					// }, 510);
				}
			}
		},
		{
			threshold: 1,
		}
	);
	// console.log(observer);
	// make sure you understand why setTimeout fixed it (still inconsistent)
	setTimeout(() => {
		listItems.forEach((li) => {
			// console.log(li);
			observer.observe(li);
		});
	});
}

export { observeIntersection };
