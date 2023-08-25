export const cardWrapper = document.querySelector("#card-wrapper");
export const searchInput = document.querySelector("#search-input");
export const pageIndex = document.querySelector("#page-index");
export const previousPage = document.querySelector("#previous-page");
export const nextPage = document.querySelector("#next-page");
export const pageButtons = document.querySelector("#page-buttons");
export const modal = document.querySelector("#modal");
export const modalInfoWrapper = document.querySelector("#info-wrapper");

modal.addEventListener("click", () => {
  modalInfoWrapper.classList.remove("fade-in");
  modalInfoWrapper.classList.add("fade-out");
  setTimeout(() => {
    modal.classList.remove("modal-visible");
    modal.classList.add("modal-hidden");
  }, 500);
});
