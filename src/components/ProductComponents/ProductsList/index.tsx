import CustomDescription from '@/components/CustomDescription'
import CustomSection from '@/components/CustomSection'
import { IProduct } from '@/interfaces/products'

const ProductsList = ({ data }) => {
  return data.map((product: IProduct, index: number) => (
    <CustomSection
      image={product.images[0]}
      imageName={product.name}
      pathname={`/sorteio/${product.slug}`}
      key={product.id}
      index={index}
    >
      <CustomDescription product={product} />
    </CustomSection>
  ))
}

export default ProductsList
