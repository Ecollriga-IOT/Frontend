export default class CropField {
  constructor(
    cropFieldId,
    cropFieldName,
    cropFieldDescription,
    latitudeData,
    longitudeData,
    cropFieldSize,
    soilType,
    cropType,
    cropVariety,
    cropPlant,
    cropPlantingDate,
    numPlants,
    minTemperature,
    maxTemperature,
    minHumidity,
    maxHumidity,
    irrigationRecords
  ) {
    this.cropFieldId = cropFieldId;
    this.cropFieldName = cropFieldName;
    this.cropFieldDescription = cropFieldDescription;
    this.latitudeData = latitudeData;
    this.longitudeData = longitudeData;
    this.cropFieldSize = cropFieldSize;
    this.soilType = soilType;
    this.cropType = cropType;
    this.cropVariety = cropVariety;
    this.cropPlant = cropPlant;
    this.cropPlantingDate = cropPlantingDate;
    this.numPlants = numPlants;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.minHumidity = minHumidity;
    this.maxHumidity = maxHumidity;
    this.irrigationRecords = irrigationRecords;
  }
  static fromJson(json) {
    return new CropField(
      json.cropFieldId,
      json.cropFieldName,
      json.cropFieldDescription,
      json.latitudeData,
      json.longitudeData,
      json.cropFieldSize,
      json.soilType,
      json.cropType,
      json.cropVariety,
      json.cropPlant,
      json.cropPlantingDate,
      json.numPlants,
      json.minTemperature,
      json.maxTemperature,
      json.minHumidity,
      json.maxHumidity,
      json.irrigationRecords
    );
  }
  toJson() {
    return {
      cropFieldId: this.cropFieldId,
      cropFieldName: this.cropFieldName,
      cropFieldDescription: this.cropFieldDescription,
      latitudeData: this.latitudeData,
      longitudeData: this.longitudeData,
      cropFieldSize: this.cropFieldSize,
      soilType: this.soilType,
      cropType: this.cropType,
      cropVariety: this.cropVariety,
      cropPlant: this.cropPlant,
      cropPlantingDate: this.cropPlantingDate,
      numPlants: this.numPlants,
      minTemperature: this.minTemperature,
      maxTemperature: this.maxTemperature,
      minHumidity: this.minHumidity,
      maxHumidity: this.maxHumidity,
      irrigationRecords: this.irrigationRecords,
    };
  }
}
