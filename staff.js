document.addEventListener("DOMContentLoaded", () => {
  const staffMembers = document.querySelectorAll(".staff-member");
  const factOverlay = document.getElementById("factOverlay");
  const factText = document.getElementById("factText");

  function showFactOverlay(fact) {
    factText.textContent = fact;
    factOverlay.style.display = "flex";
    setTimeout(() => {
      factOverlay.classList.add("active");
    }, 10);
  }

  function hideFactOverlay() {
    factOverlay.classList.remove("active");
    setTimeout(() => {
      factOverlay.style.display = "none";
    }, 300);
  }

  staffMembers.forEach((member) => {
    member.addEventListener("click", () => {
      const fact = member.getAttribute("data-fact");
      showFactOverlay(fact);
    });
  });

  factOverlay.addEventListener("click", (event) => {
    if (event.target === factOverlay) {
      hideFactOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideFactOverlay();
    }
  });
});