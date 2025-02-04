document.addEventListener("DOMContentLoaded", () => {
    const reviews = [
      { text: "PillowTalk is the pinnacle of RecRoom entertainment! The hosts' chemistry is unmatched.", rating: 5 },
      {
        text: "I've never been more engaged with a RecRoom show. PillowTalk tackles important community issues with humor and grace.",
        rating: 5,
      },
      {
        text: "PillowTalk has single-handedly improved my RecRoom experience. The community insights and tips are invaluable!",
        rating: 5,
      },
      { text: "This show is a RecRoom institution! The way they involve the community is unparalleled.", rating: 5 },
      {
        text: "PillowTalk strikes the perfect balance between informative and entertaining. It's my weekly dose of RecRoom goodness!",
        rating: 4,
      },
      {
        text: "I've learned so much about RecRoom's hidden gems through PillowTalk. It's expanded my horizons in the game!",
        rating: 5,
      },
    ]
  
    const reviewsContainer = document.getElementById("reviewsContainer")
  
    function createReviewElement(review) {
      const reviewElement = document.createElement("div")
      reviewElement.className = "review"
  
      const text = document.createElement("p")
      text.textContent = review.text
  
      const stars = document.createElement("div")
      stars.className = "stars"
      stars.textContent = "★".repeat(review.rating)
  
      reviewElement.appendChild(text)
      reviewElement.appendChild(stars)
  
      return reviewElement
    }
  
    reviews.forEach((review) => {
      reviewsContainer.appendChild(createReviewElement(review))
    })
  })
  
  