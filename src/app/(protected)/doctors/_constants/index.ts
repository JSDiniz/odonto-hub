export enum MedicalSpecialty {
  Cirurgia_e_Traumatologia_Bucomaxilofacial = "Cirurgia e Traumatologia Bucomaxilofacial",
  Clinica_Geral = "Clínica Geral",
  Dentistica = "Dentística",
  Disfuncao_Temporomandibular_e_Dor_Orofacial = "Disfunção Temporomandibular e Dor Orofacial",
  Endodontia = "Endodontia",
  Estomatologia = "Estomatologia",
  Implantodontia = "Implantodontia",
  Odontogeriatria = "Odontogeriatria",
  Odontologia_do_Esporte = "Odontologia do Esporte",
  Odontologia_do_Trabalho = "Odontologia do Trabalho",
  Odontologia_Legal = "Odontologia Legal",
  Odontologia_para_Pacientes_com_Necessidades_Especiais = "Odontologia para Pacientes com Necessidades Especiais",
  Odontopediatria = "Odontopediatria",
  Ortodontia = "Ortodontia",
  Ortopedia_Funcional_dos_Maxilares = "Ortopedia Funcional dos Maxilares",
  Patologia_Bucal = "Patologia Bucal",
  Periodontia = "Periodontia",
  Protese_Bucomaxilofacial = "Prótese Bucomaxilofacial",
  Protese_Dentaria = "Prótese Dentária",
  Radiologia_Odontologica_e_Imaginologia = "Radiologia Odontológica e Imaginologia",
  Saude_Coletiva_e_da_Familia = "Saúde Coletiva e da Família",
}

export const medicalSpecialties = Object.entries(MedicalSpecialty).map(
  ([key, values]) => ({
    values: MedicalSpecialty[key as keyof typeof MedicalSpecialty],
    label: values,
  }),
);
