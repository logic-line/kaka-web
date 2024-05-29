export interface Settings {
      slug: string,
      settingsgroup: string,
      value: string
}

export interface UpsertSettingsRequest {
    settingsList: Array<any>,
}

export interface GetSettingsRequest {
      slug: string,
      settingsgroup: string,
}

export interface ListSettingsRequest {
      settingsgroup: string,
  }

export interface settingItem {
      CreatedAt: null,
      SettingsGroup: string,
      Slug: string,
      UpdatedAt: null,
      Value: string
}

export interface roleListTyle {
      CreatedAt: string,
      CreatedBy: string,
      Description: string,
      ID: string,
      IsActive: string,
      Name: string,
      Slug: string,
      UpdatedAt: string,
      UpdatedBy: string,
  }
  export interface listType {
      Role:Array<roleListTyle>
  }