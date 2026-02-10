import { Brain, MapPin, MessageCircle, Phone } from 'lucide-react'
import { MapComponent } from '@/components/map'
import { PageContainer } from '@/components/page-container'
import { DocumentsInfoCard } from './components/card'
import { DocumentsListItem } from './components/list'
import {
  DOCUMENT_LIST_ADDICTIONS_AND_MYTHS,
  DOCUMENT_LIST_BENEFITS_OF_QUITTING,
  DOCUMENT_LIST_HEALTH_EFFECTS,
  DOCUMENT_LIST_RECOVERY_STRATEGIES,
  LINK_CVV,
} from './constants'

export function DocumentsPage() {
  const handleRedirectCVV = () => {
    window.open(LINK_CVV, '_blank', 'noopener,noreferrer')
  }

  return (
    <PageContainer title="Recursos">
      <div className="flex gap-4">
        <div className="max-w-200 p-6 bg-white rounded-md border border-renovar-other-gray-soft/30 flex flex-col gap-4 overflow-x-scroll">
          <DocumentsInfoCard
            title="Materias educativos"
            description="Esses são os materias que vão te auxiliar nessa luta. Não tenha pressa, eles estão disponíveis para você a qualquer momento."
            icon={
              <div className="p-2 rounded-full bg-renovar-primary-soft self-start">
                <Brain className="text-renovar-primary" />
              </div>
            }
          />
          <DocumentsListItem
            title="Vícios e Mitos"
            steps={DOCUMENT_LIST_ADDICTIONS_AND_MYTHS}
          />
          <DocumentsListItem
            title="Efeitos na Saúde"
            steps={DOCUMENT_LIST_HEALTH_EFFECTS}
          />
          <DocumentsListItem
            title="Benefícios de Parar"
            steps={DOCUMENT_LIST_BENEFITS_OF_QUITTING}
          />
          <DocumentsListItem
            title="Estratégias de Recuperação"
            steps={DOCUMENT_LIST_RECOVERY_STRATEGIES}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="bg-white rounded-md border border-renovar-other-gray-soft/30 py-6 pl-6 pr-10 flex flex-col gap-4">
            <DocumentsInfoCard
              title="Centros de tratamento"
              description="Encontre locais com profissionais especializados perto de você"
              icon={
                <div className="p-2 rounded-full bg-[#007F95]/20 self-start">
                  <MapPin className="text-[#007F95]" />
                </div>
              }
            />
            <MapComponent />
          </div>
          <div className="bg-white rounded-md border border-renovar-other-gray-soft/30 p-6">
            <DocumentsInfoCard
              title={
                <div className="flex items-center justify-between w-full">
                  <h1 className="font-bold pb-2 text-lg">Apoio Imediato</h1>
                  <button
                    type="button"
                    onClick={handleRedirectCVV}
                    className="font-semibold bg-red-800 text-white px-4 py-2 rounded-md text-xs"
                  >
                    Conversar com voluntário do CVV
                  </button>
                </div>
              }
              description="Precisa de apoio emocional urgente? O CVV oferece apoio gratuito e sigiloso;"
              moreInfo={
                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex gap-2">
                    <Phone className="text-red-600" />
                    <p className="text-renovar-other-gray-soft">
                      Telefone: 188 (ligação gratuita - 24h por dia)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <MessageCircle className="text-red-600" />
                    <p className="text-renovar-other-gray-soft">
                      Chat online: atendimento no site (horários de
                      funcionamento)
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
