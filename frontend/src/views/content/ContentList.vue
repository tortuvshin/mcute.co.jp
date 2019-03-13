<template>
    <div class="wrapper ecommerce-page">
       
        <div class="content">
            <div class="section">
                <div class="container">
                    <h2 class="section-title">Collect art and design online</h2>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="collapse-panel">
                                <div class="card-body">
                                    <div class="card card-refine card-plain">
                                        <h4 class="card-title">
                                            Refine
                                            <button class="btn btn-default btn-icon btn-neutral pull-right"
                                                    rel="tooltip" title="Reset Filter">
                                                <i class="arrows-1_refresh-69 intelligo-icons"></i>
                                            </button>
                                        </h4>
                                        <collapse>
                                            <collapse-item no-icon class="card-header">
                                                <h6 class="mb-0 text-primary" slot="title">
                                                    Price Range
                                                    <i class="intelligo-icons arrows-1_minimal-down"></i>
                                                </h6>
                                                <span class="price-left pull-left"> &yen; {{filters.priceRange[0]}}</span>
                                                <span class="price-right pull-right"> &yen; {{filters.priceRange[1]}}</span>
                                                <div class="clearfix"></div>
                                                <slider id="slider-refine"
                                                        class="slider-refine"
                                                        v-model="filters.priceRange"
                                                        :range="{min: 0, max: 90000}"
                                                        :connect="true">
                                                </slider>
                                            </collapse-item>
                                            <collapse-item no-icon class="card-header">
                                                <h6 class="mb-0 text-primary" slot="title">
                                                    Categories
                                                    <i class="intelligo-icons arrows-1_minimal-down"></i>
                                                </h6>
                                                <n-checkbox v-for="item in filters.itemTypes"
                                                            v-model="item.value"
                                                            :key="item.label">
                                                    {{item.label}}
                                                </n-checkbox>
                                            </collapse-item>
                                            <collapse-item no-icon class="card-header">
                                                <h6 class="mb-0 text-primary" slot="title">
                                                    Artist
                                                    <i class="intelligo-icons arrows-1_minimal-down"></i>
                                                </h6>
                                                <n-checkbox v-for="artist in filters.artistTypes"
                                                            v-model="artist.value"
                                                            :key="artist.label">
                                                    {{artist.label}}
                                                </n-checkbox>
                                            </collapse-item>
                                            <collapse-item no-icon class="card-header">
                                                <h6 class="mb-0 text-primary" slot="title">
                                                    Colour
                                                    <i class="intelligo-icons arrows-1_minimal-down"></i>
                                                </h6>
                                                <n-checkbox v-for="color in filters.colourTypes"
                                                            v-model="color.value"
                                                            :key="color.label">
                                                    {{color.label}}
                                                </n-checkbox>
                                            </collapse-item>
                                        </collapse>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-lg-4 col-md-6"
                                     v-for="product in products"
                                     :key="product.title">
                                    <card type="product" plain>
                                        <img slot="image" :src="product.image" alt="">

                                        <a href="#">
                                            <h4 class="card-title">{{product.title}}</h4>
                                        </a>
                                        <p class="card-description">
                                            {{product.description}}
                                        </p>
                                        <div class="card-footer">
                                            <div class="price-container">
                                                <span class="price"> &yen; {{product.price}}</span>
                                            </div>
                                            <el-tooltip effect="light" content="Add to wishlist" placement="top">
                                                <n-button type="danger" icon round class="pull-right btn-neutral">
                                                    <i class="intelligo-icons ui-2_favourite-28"></i>
                                                </n-button>
                                            </el-tooltip>
                                        </div>
                                    </card>
                                </div>
                                <div class="col-md-3 ml-auto mr-auto">
                                    <n-button type="primary" round>Load more...</n-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Card, Button, InfoSection, FormGroupInput, Checkbox, Collapse, CollapseItem, Slider } from '@/components'
import { Carousel, CarouselItem, Tooltip } from 'element-ui'

export default {
  name: 'ContentList',
  bodyClass: 'ecommerce-page',
  components: {
    Card,
    InfoSection,
    Collapse,
    CollapseItem,
    Slider,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [FormGroupInput.name]: FormGroupInput,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
    [Tooltip.name]: Tooltip
  },
  data () {
    return {
      filters: {
        priceRange: [42000, 9000000],
        itemTypes: [
          {
            label: 'Abstract',
            value: false
          },
          {
            label: 'Art',
            value: false
          },
          {
            label: 'Animals',
            value: false
          },
          {
            label: 'Places',
            value: false
          },
          {
            label: 'Photos',
            value: false
          }
        ],
        artistTypes: [
          {
            label: 'All',
            value: false
          },
          {
            label: 'Alex',
            value: false
          },
          {
            label: 'McQueen',
            value: false
          },
          {
            label: 'Tom',
            value: false
          },
          {
            label: 'AMI',
            value: false
          },
          {
            label: 'Berena',
            value: false
          },
          {
            label: 'Sweeney',
            value: false
          },
          {
            label: 'Prorsum',
            value: false
          },
          {
            label: 'Kingsman',
            value: false
          },
          {
            label: 'Lanvin',
            value: false
          },
          {
            label: 'Loro',
            value: false
          },
          {
            label: 'Alba',
            value: false
          }
        ],
        colourTypes: [
          {
            label: 'All',
            value: false
          },
          {
            label: 'Black',
            value: false
          },
          {
            label: 'Blue',
            value: false
          },
          {
            label: 'Brown',
            value: false
          },
          {
            label: 'Gray',
            value: false
          },
          {
            label: 'Neutrals',
            value: false
          },
          {
            label: 'Purple',
            value: false
          }
        ]
      },
      products: [
        {
          image: 'img/art/abstract7.jpg',
          title: 'Polo Ralph Lauren',
          description: 'Impeccably tailored in Italy from lightweight navy wool.',
          price: 300000
        },
        {
          image: 'img/art/abstract2.jpg',
          title: 'Tom Ford',
          description: 'Immaculate tailoring is TOM FORD\'s forte.',
          price: 879000
        },
        {
          image: 'img/art/abstract3.jpg',
          title: 'Wooyoungmi',
          description: 'Dark-grey slub wool, pintucked notch lapels.',
          price: 555000
        },
        {
          image: 'img/art/abstract3.jpg',
          title: 'Thom Sweeney',
          description: 'It\'s made from lightweight grey wool woven.',
          price: 680000
        },
        {
          image: 'img/art/abstract5.jpg',
          title: 'Kingsman',
          description: 'Crafted from khaki cotton and fully canvassed.',
          price: 725000
        },
        {
          image: 'img/art/abstract7.jpg',
          title: 'Boglioli',
          description: 'Masterfully crafted in Northern Italy.',
          price: 699000
        },
        {
          image: 'img/art/abstract3.jpg',
          title: 'Thom Sweeney',
          description: 'It\'s made from lightweight grey wool woven.',
          price: 680000
        },
        {
          image: 'img/art/abstract5.jpg',
          title: 'Kingsman',
          description: 'Crafted from khaki cotton and fully canvassed.',
          price: 725000
        },
        {
          image: 'img/art/abstract7.jpg',
          title: 'Boglioli',
          description: 'Masterfully crafted in Northern Italy.',
          price: 699000
        }]
    }
  }
}
</script>
<style>
</style>
