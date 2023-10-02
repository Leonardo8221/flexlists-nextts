import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponse";
import axios from "src/utils/axios";
import { CreateIntegrationOutputDto } from 'src/models/ApiOutputModels';
import { Integration } from 'src/models/SharedModels'

export const integrationService = {
  createIntegration,
  updateIntegration,
  getIntegrations,
  getIntegration,
  deleteIntegration
};

async function createIntegration(name: string, description: string, type: string, trigger: string, email: string): Promise<FlexlistsError|FlexlistsSuccess<CreateIntegrationOutputDto>> {
  const response = await axios.post<FlexlistsError|FlexlistsSuccess<CreateIntegrationOutputDto>>(`/api/integration/createIntegration`, {name, description, type, trigger, email});

  return response.data;
};

async function updateIntegration(integrationId: number, name: string, description: string, type: string, trigger: string, email: string): Promise<FlexlistsError|FlexlistsSuccess> {
  const response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/integration/updateIntegration`, {integrationId, name, description, type, trigger, email});

  return response.data;
};

async function getIntegrations(): Promise<FlexlistsError|FlexlistsSuccess<Integration[]>> {
  const response = await axios.get<FlexlistsError|FlexlistsSuccess<Integration[]>>('/api/integration/getIntegrations');

  return response.data;
};

async function getIntegration(IntegrationId: number): Promise<FlexlistsError | FlexlistsSuccess<Integration>> {
  const response = await axios.get<FlexlistsError | FlexlistsSuccess<Integration>>('/api/list/getIntegration' + `?IntegrationId=${IntegrationId}`);

  return response.data;
};

async function deleteIntegration(integrationId: number): Promise<FlexlistsError|FlexlistsSuccess> {
  const response = await axios.get<FlexlistsError|FlexlistsSuccess>('/api/integration/deleteIntegration'+`integrationId=${integrationId}`);

  return response.data;
};