// Initialize Supabase client
const supabaseUrl = "https://dhfalykghqmhrwydpzjx.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoZmFseWtnaHFtaHJ3eWRwemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkzMDE0ODEsImV4cCI6MjA1NDg3NzQ4MX0.ykBwHXp31ZbwpKlypbbdnOVnIeNfYanm0XOO3euGj0o"
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

const reviewsContainer = document.getElementById("reviewsContainer")
const reviewForm = document.getElementById("reviewForm")

function createReviewElement(review) {
  const reviewElement = document.createElement("div")
  reviewElement.className = "review"

  const starsHTML = "★".repeat(review.rating) + "☆".repeat(5 - review.rating)
  const formattedDate = new Date(review.created_at).toLocaleDateString("en-US", {
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
    <p class="review-author">- ${review.name}</p>
  `

  return reviewElement
}

function displayReviews(reviews) {
  reviewsContainer.innerHTML = ""
  const fragment = document.createDocumentFragment()

  reviews.forEach((review) => {
    fragment.appendChild(createReviewElement(review))
  })

  reviewsContainer.appendChild(fragment)
}

async function fetchReviews() {
  const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(20)

  if (error) {
    console.error("Error fetching reviews:", error)
    return
  }

  displayReviews(data)
}

fetchReviews()

// Set up real-time listener for new reviews
supabase
  .channel("public:reviews")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "reviews" }, (payload) => {
    const newReview = payload.new
    const reviewElement = createReviewElement(newReview)
    reviewsContainer.insertBefore(reviewElement, reviewsContainer.firstChild)
  })
  .subscribe()

reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const reviewName = document.getElementById("reviewName").value
  const reviewText = document.getElementById("reviewText").value
  const rating = document.querySelector('input[name="rating"]:checked').value

  const newReview = {
    name: reviewName,
    text: reviewText,
    rating: Number(rating),
  }

  // Add the new review to Supabase
  const { data, error } = await supabase.from("reviews").insert([newReview])

  if (error) {
    console.error("Error inserting review:", error)
    return
  }

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