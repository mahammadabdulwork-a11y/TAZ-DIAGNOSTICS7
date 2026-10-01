import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Heart, 
  Plus, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  MapPin, 
  Filter,
  ThumbsUp
} from 'lucide-react';
import { TESTIMONIALS } from '../data/testsData';

export default function Testimonials() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('taz_patient_reviews');
      return saved ? JSON.parse(saved) : TESTIMONIALS;
    } catch {
      return TESTIMONIALS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 5 | 4
  const [toastMessage, setToastMessage] = useState(null);

  // Form State
  const [newReview, setNewReview] = useState({
    name: '',
    city: 'Tallapudi',
    testTaken: 'Full Body Health Package',
    rating: 5,
    comment: ''
  });

  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('taz_patient_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert('Please fill in your name and review comment.');
      return;
    }

    const createdReview = {
      name: newReview.name.trim(),
      role: `Patient • ${newReview.testTaken}`,
      comment: newReview.comment.trim(),
      rating: newReview.rating,
      city: newReview.city.trim() || 'Tallapudi',
      verified: true,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setReviews(prev => [createdReview, ...prev]);
    setIsModalOpen(false);
    setNewReview({
      name: '',
      city: 'Tallapudi',
      testTaken: 'Full Body Health Package',
      rating: 5,
      comment: ''
    });

    setToastMessage('Thank you! Your verified review has been posted successfully.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredReviews = reviews.filter(r => {
    if (activeFilter === 'all') return true;
    return r.rating === Number(activeFilter);
  });

  const avgRating = (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / (reviews.length || 1)).toFixed(1);

  return (
    <section id="reviews" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 relative">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-emerald-400 shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header & Rating Summary */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200">
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
              <span>Verified Patient & Community Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight">
              Trusted Across <span className="text-sky-600">Our Region.</span>
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
              Real feedback from patients across Tallapudi, Rajahmundry, Kovvur, Gajaram, and Chidipi who experienced our 24/7 automated pathology testing.
            </p>
          </div>

          {/* Rating Badge & Write Review Trigger */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2.5">
              <div className="text-2xl font-black text-slate-900 font-display">{avgRating}</div>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-slate-500">{reviews.length} Verified Reviews</div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveFilter(5)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              activeFilter === 5
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>5 Stars</span>
            <Star className="w-3 h-3 fill-amber-400" />
          </button>
        </div>

        {/* Responsive Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none"></div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating || 5)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {review.date && (
                    <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                  )}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic font-normal">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span title="Verified Lab Patient">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium line-clamp-1">{review.role}</p>
                </div>
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200 shrink-0">
                  {review.city}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive "Write a Review" Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black font-display">Share Your Lab Experience</h3>
                  <p className="text-xs text-sky-100">Your review helps our community in Tallapudi</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Your Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                      className="p-1 focus:outline-none transition-transform hover:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          (hoverRating || newReview.rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-black text-slate-700 ml-2">
                    {newReview.rating === 5 ? '⭐⭐⭐⭐⭐ Exceptional (5.0)' : `${newReview.rating} Stars`}
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* City & Test Taken Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your City / Town *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={newReview.city}
                      onChange={(e) => setNewReview(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g. Tallapudi"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Diagnostic Test / Service
                  </label>
                  <select
                    value={newReview.testTaken}
                    onChange={(e) => setNewReview(prev => ({ ...prev, testTaken: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Doorstep Blood Collection">🏠 Doorstep Blood Collection</option>
                    <option value="Complete Blood Count (CBC)">🩸 Complete Blood Count (CBC)</option>
                    <option value="Thyroid Profile (T3, T4, TSH)">🧬 Thyroid Profile (T3, T4, TSH)</option>
                    <option value="Taz Heart Advanced (56 Params)">❤️ Taz Heart Advanced</option>
                    <option value="Diabetes HbA1c Panel">🧪 Diabetes HbA1c Panel</option>
                    <option value="Full Body Master Package">🏆 Full Body Master Package</option>
                    <option value="General Lab Walk-in">🏥 Lab Center Walk-in</option>
                  </select>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Review & Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share details of your experience: staff punctuality, sample collection comfort, report delivery speed..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Verified Review</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
