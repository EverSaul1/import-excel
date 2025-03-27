export interface ResultTem {
  id: number
  file_hash: string
  data: any,
  is_valid: boolean
  is_processed: boolean
  created_at: string
  updated_at: string
  deleted_at: any
  acciones: string;
}

export interface Persona {
  nombres: string;
  apellidos: string;
  documento: string;
  fecha_de_nacimiento: string;
  telefono: string;
  email: string;
  documento_responsable: string;
  documento_responsable_financiero: string;
  curso: string;
}
