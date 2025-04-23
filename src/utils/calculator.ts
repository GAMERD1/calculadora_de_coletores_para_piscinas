import { FormData } from '../context/ThemeContext';
import { brandsData } from '../data/brands';

export interface RoofResult {
  maxPerRow: number;
  maxRows: number;
  maxPossible: number;
}

export interface BrandResult {
  model?: string;
  collectors: number;
  collectorArea?: number;
  roofResult?: RoofResult | null;
}

export interface ResultType {
  area: number;
  correctedArea: number;
  volumeInLiters: number;
  brandResults: BrandResult[];
}

export const calculateResults = (formData: FormData): ResultType => {
  // Parse basic inputs
  const length = parseFloat(formData.length);
  const width = parseFloat(formData.width);
  const temperatureFactor = parseFloat(formData.temperature);
  const climateFactor = parseFloat(formData.climate);
  const roofOrientationFactor = parseFloat(formData.roofOrientation);
  const additionalHeating = formData.additionalHeating;
  const checkRoofSize = formData.checkRoofSize;
  const selectedBrand = formData.brand;
  
  // Calculate area and volume
  let area = length * width;
  const volumeInLiters = area * 1000; // Considering 1m depth
  
  // Apply additional heating factor if checked
  if (additionalHeating) {
    area = area * 1.3;
  }
  
  // Apply correction factors
  const correctedArea = area * temperatureFactor * climateFactor * roofOrientationFactor;
  
  // Get brand data
  const brand = brandsData[selectedBrand as keyof typeof brandsData];
  const brandResults: BrandResult[] = [];
  
  // Calculate required collectors based on brand type
  if (brand.models) {
    // For brands with specific models
    for (const [model, specs] of Object.entries(brand.models)) {
      const collectors = Math.ceil(correctedArea / specs.area);
      
      let roofResult = null;
      
      // Calculate roof capacity if enabled
      if (checkRoofSize && formData.roofWidth && formData.roofLength) {
        const roofWidth = parseFloat(formData.roofWidth);
        const roofLength = parseFloat(formData.roofLength);
        
        if (roofWidth > 0 && roofLength > 0) {
          const usableWidth = roofWidth - 1; // 0.5m margin on each side
          const usableLength = roofLength - 1;
          
          const maxPerRow = Math.floor(usableLength / specs.length);
          const maxRows = Math.floor(usableWidth / specs.width);
          const maxPossible = maxPerRow * maxRows;
          
          roofResult = {
            maxPerRow,
            maxRows,
            maxPossible
          };
        }
      }
      
      brandResults.push({
        model,
        collectors,
        collectorArea: specs.area,
        roofResult
      });
    }
  } else if (brand.litersPerCollector) {
    // For brands based on liters per collector
    const collectors = Math.ceil(volumeInLiters / brand.litersPerCollector);
    
    brandResults.push({
      collectors,
      collectorArea: undefined,
      roofResult: null
    });
  }
  
  return {
    area,
    correctedArea,
    volumeInLiters,
    brandResults
  };
};