import React from 'react'

const ListReviews = ({ reviews }) => {
    return (
        <div class="reviews w-75">
            <h3 className="text-lg">Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} class="review-card my-3">
                    <div class="rating-outer">
                        <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p class="review_user mb-1">by {review.name}</p>
                    <p class="review_comment mb-3">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews