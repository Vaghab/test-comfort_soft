export interface Features {
  features: [
    {
      geometry: {
        coordinates: [number, number];
        type: string;
      };
      properties: {
        datasetId: number;
        rowId: number | null;
        attributes: {
          is_deleted: number;
          ID: number;
          Name: string;
          global_id: number;
          AdmArea: string;
          District: string;
          Address: string;
          MetroStation: string;
          MetroLine: string;
          WiFiAvailability: string;
          BabyCareRoom: string;
          SanitationFacilities: string;
          PublicPhone: [
            {
              is_deleted: number;
              Phone: string;
              global_id: number;
            }
          ];
          WebSite: string;
          WorkingHours: [
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            },
            {
              is_deleted: number;
              DayOfWeek: string;
              Hours: string;
              global_id: number;
            }
          ];
          BusDestination: string;
          LocationComment: string;
          Latitude_WGS84: string;
          Longitude_WGS84: string;
        };
        versionNumber: number;
        releaseNumber: number;
      };
      type: string;
    }
  ];
}

export interface Library {
  name: string;
  address: string;
}
