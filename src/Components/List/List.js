import "./list.css"
import Card from "../Card/Card"
import { useGetAllProductsQuery } from "../../features/productsApi";
const List = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (

    <div className="list1">
      {data?.map(item=>(
        <Card item = {item} key={item.id}/>
      ))}
    </div>
  )
}

export default List
