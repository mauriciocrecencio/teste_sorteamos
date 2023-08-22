import CustomSection from '@/components/CustomSection'
import SocialMediaButtons from '@/components/SocialMediaButtons'
import Title from '@/components/Title'
import { useStaticData } from '@/store/staticStore'
import { useProductStore } from '@/store/productStore'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Afiliados() {
  const router = useRouter()
  const staticData = useStaticData((state) => state.staticData)
  const products = useProductStore((state) => state.products)
  const user = useUserStore((state) => state.user)

  function copyToClipboard(text) {
    toast.success('Link copiado! 😀', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }

  const linkToCopy =
    typeof window !== 'undefined' ? `${window.location.host}/sorteio/` : ''

  return (
    <>
      <Title
        data={{
          title: '⚡ ' + staticData?.texts?.affiliates?.title || '',
          sub: staticData?.texts?.affiliates?.sub || '',
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
              <h2>{product.name}</h2>
              <button
                className="button-afiliated"
                onClick={() =>
                  copyToClipboard(
                    `${linkToCopy + product.slug}/?affiliate_id=${user.id}`,
                  )
                }
              >
                Copiar Link de Afiliado
              </button>
            </CustomSection>
          ))}
      {staticData?.useful?.whatsapp && (
        <SocialMediaButtons linkWhatsapp={staticData.useful.whatsapp} />
      )}
    </>
  )
}
