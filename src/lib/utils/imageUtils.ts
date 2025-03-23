/**
 * 이미지 처리에 관련된 유틸리티 함수들
 * 이미지 크롭, 리사이징, WebP 변환 기능을 포함
 */

/**
 * 이미지 파일을 처리하여 cropped, resized, webp 변환된 Blob으로 반환
 * @param file 사용자가 업로드한 이미지 파일
 * @param maxSize 이미지 최대 크기 (픽셀 단위, 기본값 128)
 * @returns 처리된 이미지 Blob과 해당 URL
 */
export async function processImage(
  file: File,
  maxSize: number = 128
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    // 파일을 데이터 URL로 로드
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 캔버스 생성
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas 2D context를 생성할 수 없습니다."));
          return;
        }

        // 이미지 크롭을 위한 계산
        let width = img.width;
        let height = img.height;
        let startX = 0;
        let startY = 0;

        // 정사각형으로 크롭
        if (width > height) {
          startX = (width - height) / 2;
          width = height;
        } else {
          startY = (height - width) / 2;
          height = width;
        }

        // 캔버스 크기 설정
        canvas.width = maxSize;
        canvas.height = maxSize;

        // 이미지 그리기 (크롭 & 리사이징)
        ctx.drawImage(
          img,
          startX,
          startY,
          width,
          height,
          0,
          0,
          maxSize,
          maxSize
        );

        // WebP 형식으로 변환
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("이미지 변환에 실패했습니다."));
              return;
            }

            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
          },
          "image/webp",
          0.85 // 품질 설정 (0.0 ~ 1.0)
        );
      };

      img.onerror = () => {
        reject(new Error("이미지를 로드할 수 없습니다."));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error("파일을 읽을 수 없습니다."));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * 파일 확장자로부터 MIME 타입 추출
 * @param filename 파일명
 * @returns MIME 타입
 */
export function getMimeType(filename: string): string {
  const extension = filename.toLowerCase().split(".").pop();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

/**
 * 이미지 파일을 Supabase에 업로드하기 적합한 형식인지 검증
 * @param file 업로드할 파일
 * @returns 유효성 여부
 */
export function validateImageFile(file: File): {
  valid: boolean;
  message?: string;
} {
  // 파일 크기 제한 (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message: "이미지 크기는 5MB 이하여야 합니다.",
    };
  }

  // 허용된 이미지 형식
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "JPG, PNG, GIF, WebP 형식의 이미지만 업로드 가능합니다.",
    };
  }

  return { valid: true };
}
