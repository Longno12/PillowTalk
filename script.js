const reviewsContainer = document.getElementById("reviewsContainer")
const reviewForm = document.getElementById("reviewForm")

const reviews = JSON.parse(localStorage.getItem("pillowTalkReviews")) || []

function saveReviews() {
  localStorage.setItem("pillowTalkReviews", JSON.stringify(reviews))
}

function createReviewElement(review) {
  const reviewElement = document.createElement("div")
  reviewElement.className = "review"

  const starsHTML = "★".repeat(review.rating) + "☆".repeat(5 - review.rating)
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  reviewElement.innerHTML = `
        <div class="review-content">
            <p class="review-text">${review.text}</p>
            <div class="review-rating">
                <span class="review-stars">${starsHTML}</span>
                <span class="review-date">${formattedDate}</span>
            </div>
        </div>
    `

  return reviewElement
}

function displayReviews() {
  reviewsContainer.innerHTML = ""
  const fragment = document.createDocumentFragment()

  reviews.forEach((review) => {
    fragment.appendChild(createReviewElement(review))
  })

  reviewsContainer.appendChild(fragment)

  if (reviews.length === 0) {
    const noReviewsMessage = document.createElement("p")
    noReviewsMessage.textContent = "Be the first to leave a review!"
    noReviewsMessage.className = "no-reviews-message"
    reviewsContainer.appendChild(noReviewsMessage)
  }
}

displayReviews()

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const reviewText = document.getElementById("reviewText").value
  const rating = document.querySelector('input[name="rating"]:checked').value

  const newReview = {
    text: reviewText,
    rating: Number.parseInt(rating),
    date: new Date().toISOString(),
  }

  reviews.unshift(newReview)
  if (reviews.length > 20) {
    reviews.pop()
  }

  saveReviews()
  displayReviews()

  reviewForm.reset()

  // Show a success message
  const successMessage = document.createElement("div")
  successMessage.textContent = "Thank you for your review!"
  successMessage.className = "success-message"
  reviewForm.appendChild(successMessage)

  // Remove the success message after 3 seconds
  setTimeout(() => {
    successMessage.remove()
  }, 3000)
})

// Add this to your existing CSS file
const additionalCSS = `
.no-reviews-message {
    text-align: center;
    font-style: italic;
    color: var(--text-color);
    opacity: 0.7;
}

.success-message {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    text-align: center;
}
`

// Create a new style element and append it to the head
const style = document.createElement("style")
style.textContent = additionalCSS
document.head.appendChild(style)

