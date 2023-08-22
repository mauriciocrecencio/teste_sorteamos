import CustomDescription from '@/components/CustomDescription'
import CustomSection from '@/components/CustomSection'
import SocialMediaButtons from '@/components/SocialMediaButtons'
import Title from '@/components/Title'
import Usability from '@/components/Usability'
import { useStaticData } from '@/store/staticStore'
import { useProductStore } from '@/store/productStore'

export default function MeusSorteios() {
  const staticData = useStaticData((state) => state.staticData)
  const products = useProductStore((state) => state.products)
  return (
    <>
      <Usability
        title={`Sorteios ${
          staticData?.useful?.name ? `- ${staticData.useful.name}` : ''
        }`}
      />
      <Title
        data={{
          title: '⚡ ' + staticData?.texts?.sweepstake?.title || '',
          sub: staticData?.texts?.sweepstake?.sub || '',
        }}
      />

      {products &&
        products
          .filter((product) => product.active)
          .map((product) => (
            <CustomSection
              key={product.id}
              image={product.images[0]}
              imageName={product.name}
              pathname={`/sorteio/${product.slug}`}
            >
              <CustomDescription product={product} />
            </CustomSection>
          ))}
      {staticData?.useful?.whatsapp && (
        <SocialMediaButtons linkWhatsapp={staticData.useful.whatsapp} />
      )}
    </>
  )
}
