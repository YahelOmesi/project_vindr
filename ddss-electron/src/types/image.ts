export type SeriesMetadata = {
  class: string;
  imageFormat: string;
  imageView: string;
  leftOrRightBreast: string;
  sopUIDs: string[];
  uid: string;
  image_laterality?: string;
  view_position?: string;
};

export type ImageMetadata = SeriesMetadata[];
export type ImagesMetadata = Record<string, SeriesMetadata[]>;

export type Metadata = {
  imagesMetadata: ImageMetadata;
  imageCount: number;
};

export type PatientImages = {
  id?: number;
  seriesUID?: string;
  sopUID?: string;
  class?: string;
  imageView: string;
  leftOrRightBreast: string;
  imageFilePath: string;
};

export type ImageContainerProps = {
  seriesUID: string;
  sopUID: string;
  seriesMetadata: SeriesMetadata;
  title?: string;
  goToImageView?: (imageFilePath: string) => void;
};
