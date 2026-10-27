import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Camera, Eye, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export const GallerySection = () => {
  const { language, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const galleryData = t.gallery;

  const filters = [
    { id: 'all', label: galleryData.filterAll },
    { id: 'studio', label: galleryData.filterStudio },
    { id: 'heritage', label: galleryData.filterHeritage },
    { id: 'brand', label: galleryData.filterBrand }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryData.items 
    : galleryData.items.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (item) => {
    setSelectedPhoto(item);
  };

  const handleCloseLightbox = () => {
    setSelectedPhoto(null);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex(item => item.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedPhoto(filteredItems[prevIndex]);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = filteredItems.findIndex(item => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedPhoto(filteredItems[nextIndex]);
  };

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge-tag">
            <Camera size={14} className="text-amber-700" />
            <span>{language === 'en' ? 'Authentic Photoshoots' : 'உண்மையான புகைப்படங்கள்'}</span>
          </div>
          <h2 className="section-title">{galleryData.heading}</h2>
          <p className="section-subtitle">{galleryData.subheading}</p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="gallery-filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`gallery-filter-btn cursor-pointer ${activeFilter === filter.id ? 'active' : ''}`}
            >
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Masonry / Dynamic Photo Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLightbox(item);
                }
              }}
              className={`gallery-card cursor-pointer ${idx === 0 || idx === 3 ? 'gallery-card-wide' : ''}`}
              onClick={() => handleOpenLightbox(item)}
            >
              <div className="gallery-img-wrap">
                <img
                  src={item.src}
                  alt={item.title}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-tag">
                      {item.category === 'studio' ? (language === 'en' ? 'Studio Photoshoot' : 'ஸ்டுடியோ புகைப்படம்') :
                       item.category === 'heritage' ? (language === 'en' ? 'Temple & Heritage' : 'பாரம்பரியம் & பூஜை') :
                       (language === 'en' ? 'Official Brand Poster' : 'அதிகாரப்பூர்வ போஸ்டர்')}
                    </span>
                    <h3 className="gallery-item-title">{item.title}</h3>
                    <p className="gallery-item-desc">{item.desc}</p>
                    <div className="gallery-view-action">
                      <Eye size={18} />
                      <span>{language === 'en' ? 'Click to Enlarge' : 'பெரிதாக்கிப் பார்க்க'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-backdrop" onClick={handleCloseLightbox}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close photo view"
              className="lightbox-close-btn cursor-pointer"
              onClick={handleCloseLightbox}
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="lightbox-nav-btn lightbox-prev cursor-pointer"
                  onClick={handlePrevPhoto}
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="lightbox-nav-btn lightbox-next cursor-pointer"
                  onClick={handleNextPhoto}
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="lightbox-content">
              <div className="lightbox-img-container">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="lightbox-img"
                />
              </div>

              <div className="lightbox-details">
                <span className="lightbox-badge">
                  {selectedPhoto.category === 'studio' ? 'Studio Photoshoot' :
                   selectedPhoto.category === 'heritage' ? 'Heritage & Sacred Tradition' :
                   'Dayan Enterprises & Co Official'}
                </span>
                <h3 className="lightbox-title">{selectedPhoto.title}</h3>
                {language === 'ta' && selectedPhoto.tamilTitle && (
                  <p className="lightbox-tamil-title">{selectedPhoto.tamilTitle}</p>
                )}
                <p className="lightbox-desc">{selectedPhoto.desc}</p>
                <div className="lightbox-origin">
                  <MapPin size={15} className="text-amber-500" />
                  <span>West Thoothukudi, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
