type ResizeImageOptions = {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: "webp" | "jpeg" | "png";
  fit: "cover" | "contain" | "fill";
};

const DEFAULT_OPTIONS: ResizeImageOptions = {
  maxWidth: 1024,
  maxHeight: 1024,
  quality: 85,
  format: "webp",
  fit: "cover",
} as const;

export const resizeImage = async (
  file: File,
  userOptions: Partial<ResizeImageOptions> = {},
): Promise<File> => {
  // Merge default options with user options
  const options: ResizeImageOptions = {
    ...DEFAULT_OPTIONS,
    ...userOptions,
  };

  // Create a URL for the image file
  const imageUrl = URL.createObjectURL(file);

  try {
    // Create an image element to load the file
    const img = document.createElement("img");

    // Wait for the image to load
    const loadImage = new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = imageUrl;
    });

    const image = await loadImage;

    // Set canvas dimensions based on maxWidth/maxHeight
    const canvas = document.createElement("canvas");
    canvas.width = options.maxWidth;
    canvas.height = options.maxHeight;

    // Draw the image onto the canvas based on fit type
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    // Set high quality image scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Calculate source and destination dimensions based on fit
    let sWidth = image.width;
    let sHeight = image.height;
    let dx = 0;
    let dy = 0;
    let dWidth = options.maxWidth;
    let dHeight = options.maxHeight;

    if (options.fit === "contain") {
      // Scale to fit within canvas while maintaining aspect ratio
      const scale = Math.min(
        options.maxWidth / sWidth,
        options.maxHeight / sHeight,
      );
      dWidth = Math.round(sWidth * scale);
      dHeight = Math.round(sHeight * scale);
      // Center the image
      dx = Math.floor((options.maxWidth - dWidth) / 2);
      dy = Math.floor((options.maxHeight - dHeight) / 2);
      // Clear canvas with transparency
      ctx.clearRect(0, 0, options.maxWidth, options.maxHeight);
    } else if (options.fit === "cover") {
      // Cover the entire canvas while maintaining aspect ratio
      const scale = Math.max(
        options.maxWidth / sWidth,
        options.maxHeight / sHeight,
      );
      const scaledWidth = Math.round(sWidth * scale);
      const scaledHeight = Math.round(sHeight * scale);
      // Center the image and crop overflow
      const sx = Math.floor((scaledWidth - options.maxWidth) / 2 / scale);
      const sy = Math.floor((scaledHeight - options.maxHeight) / 2 / scale);
      sWidth = Math.round(options.maxWidth / scale);
      sHeight = Math.round(options.maxHeight / scale);
      ctx.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        0,
        0,
        options.maxWidth,
        options.maxHeight,
      );
    } else {
      // "fill" - stretch to fill the canvas
      ctx.drawImage(
        image,
        0,
        0,
        sWidth,
        sHeight,
        0,
        0,
        options.maxWidth,
        options.maxHeight,
      );
    }

    // Draw the image if not already drawn (for contain and fill)
    if (options.fit !== "cover") {
      ctx.drawImage(image, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }

    // Set the appropriate MIME type based on format
    const mimeType = `image/${options.format}`;

    // Convert the canvas to a Blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob conversion failed"));
          }
        },
        mimeType,
        options.quality / 100,
      );
    });

    // Generate a new filename with the correct extension
    const fileName = file.name.replace(/\.[^.]+$/, `.${options.format}`);

    // Create a new File from the blob
    const resizedFile = new File([blob], fileName, {
      type: mimeType,
      lastModified: file.lastModified,
    });

    return resizedFile;
  } finally {
    // Clean up the created URL
    URL.revokeObjectURL(imageUrl);
  }
};
