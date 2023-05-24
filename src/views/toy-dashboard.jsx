import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement,ArcElement } from 'chart.js'
import { Bar,Line, Doughnut } from 'react-chartjs-2'
import { utilService } from '../services/util.service'
import {  useSelector } from 'react-redux'
import { loadToys, } from '../store/toy.action.js'
import { toyService } from '../services/toy.service'
// import faker from 'faker';


import { useEffect } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement,LineElement,ArcElement)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const onWheels = [362, 219, 475, 303, 568, 829, 205, 428, 779, 368, 717, 532]
const boxGame = [538, 641, 841, 512, 342, 497, 620, 157, 139, 612, 468, 376]

export default function ToyDashboard() {

const toys = useSelector((storeState) => storeState.toyModule.toys)
const toyCountByLabel = toyService.getToysPerInStock(toys) 
const pricesPerLabel = toyService.getAveragePricePerLabel(toys)

useEffect(() => {
    loadToys()
  }, [])

  const data = {
    labels: toyCountByLabel.labels,
    datasets: [
      {
        label: 'Toys Labels',
        data: toyCountByLabel.percentages ,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

   const dataMonths = {
    labels: months,
    datasets: [
      {
        label: 'On Wheels',
        data: onWheels,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Box Game',
        data: boxGame,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const doughnut = {
    labels: toyCountByLabel.labels,
    datasets: [
      {
        label: 'Avg price',
        data: pricesPerLabel.priceAvg,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(230, 159, 64, 0.5)',
          'rgba(116, 199, 108, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(116, 199, 108, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ul className="dashboard">
    <li><h3> Prices per label </h3><Bar options={options} data={data} width={'100%'} height={'100%'}/></li>
    <li><h3> Inventory by label</h3><Line options={options} data={dataMonths} width={'100%'}  height={'100%'}/></li>
    <li><h3 className='header-doughnut'> line chart</h3> <Doughnut data={doughnut} width={'100%'}  height={'100%'}/></li>
    </ul>
  )
}
