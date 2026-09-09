
import { Modal } from "antd";
import { Image as AntdImage } from "antd"; // import this
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useMemo, useRef, useState } from "react";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { IUser } from "../../../types";
import { FiChevronDown } from "react-icons/fi";
interface UserViewPortfolioModalProps {
  isViewProtfolioModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUser | null;
}

const columnsCountBreakPoints = { 350: 1, 600: 2, 1024: 3 };

const UserViewPortfolioModal: React.FC<UserViewPortfolioModalProps> = ({
  isViewProtfolioModalVisible,
  handleCancel,
  currentRecord,
}) => {
  console.log(currentRecord)
  const serverUrl = getImageUrl();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    intro: false,
    banner: false,
    images: false,
    videos: false
  });

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { galleryImages, galleryVideos } = useMemo(() => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', ".avif", ".tiff", ".heic", ".ico"];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];


    const images = currentRecord?.gallery?.filter((item) =>
      imageExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    const videos = currentRecord?.gallery?.filter((item) =>
      videoExtensions.some((ext) => item.toLowerCase().endsWith(ext))
    ) || [];


    return { galleryImages: images, galleryVideos: videos };
  }, [currentRecord?.gallery]);


  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleVideoPlay = (currentIndex: number) => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex && !video.paused) {
        video.pause();
      }
    });
  };

  return (
    <Modal
      open={isViewProtfolioModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="p-5">
        <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-center text-secondary-color mb-5">
          Professional Portfolio
        </h3>
        <div className="space-y-4">
          {currentRecord?.introVideo?.length as number > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('intro')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Intro Videos
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.intro ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.intro ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="relative group w-full">
                      <video
                        src={serverUrl + currentRecord?.introVideo}
                        controls
                        className="w-full h-full object-cover rounded-lg"
                        preload="metadata"
                        controlsList="nodownload noplaybackrate"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Images Section */}
          {currentRecord?.bannerImages?.length as number > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('banner')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Banner Images ({currentRecord?.bannerImages.length})
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.banner ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.banner ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10 ">

                  <AntdImage.PreviewGroup>
                    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
                      <Masonry gutter="10px">
                        {currentRecord?.bannerImages?.map((item, index) => (
                          <img
                            key={index}
                            width={2000}
                            height={2000}
                            src={serverUrl + item}
                            alt={"gallery Image"}
                            className="w-full h-full max-h-80 object-cover rounded-lg"
                          />
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  </AntdImage.PreviewGroup>
                </div>

              </div>
            </div>
          )}
          {galleryImages.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('images')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Images ({galleryImages.length})
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.images ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.images ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10 ">

                  <AntdImage.PreviewGroup>
                    <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
                      <Masonry gutter="10px">
                        {galleryImages?.map((item, index) => (
                          <img
                            key={index}
                            width={2000}
                            height={2000}
                            src={serverUrl + item}
                            alt={"gallery Image"}
                            className="w-full h-full max-h-80 object-cover rounded-lg"
                          />
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  </AntdImage.PreviewGroup>
                </div>

              </div>
            </div>
          )}


          {/* Videos Section */}
          {galleryVideos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleSection('videos')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold">
                  Videos ({galleryVideos.length})
                </h3>
                <FiChevronDown
                  className={`text-2xl transition-transform duration-300 ${openSections.videos ? 'transform rotate-180' : ''
                    }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openSections.videos ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryVideos.map((item, index) => (
                      <div key={index} className="relative group w-full">
                        <video
                          ref={(el) => {
                            if (el) {
                              videoRefs.current[index] = el;
                            }
                          }}
                          src={serverUrl + item}
                          controls
                          className="w-full h-full object-cover rounded-lg"
                          preload="metadata"
                          onPlay={() => handleVideoPlay(index)}
                          controlsList="nodownload noplaybackrate"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UserViewPortfolioModal;
