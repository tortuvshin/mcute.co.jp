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
                                     v-for="content in contents"
                                     :key="content.title">
                                    <card type="content" plain>
                                        <img slot="image" :src="content.image" alt="">

                                        <a href="#">
                                            <h4 class="card-title">{{content.title}}</h4>
                                        </a>
                                        <p class="card-description">
                                            {{content.description}}
                                        </p>
                                        <div class="card-footer">
                                            <div class="price-container">
                                                <span class="price"> &yen; {{content.price}}</span>
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
import { API_SERVER } from '../../api.js'
import { bus } from '../../main.js'

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
      pageNumber: 1,
      rowNumber: 20,
      totalProjectCount: 0,
      contents: [],
      loadProgress: false,
      search: {
        keyword: '',
        category: ''
      },
      isSearch: false
    }
  },
  methods: {
    fetchData () {
      this.loadProgress = true
      this.$http.get(API_SERVER + '/project/search', { 
        params: { 
          keyword: this.search.keyword, 
          category: this.search.category, 
          pageNumber: this.pageNumber, 
          rowNumber: this.rowNumber 
          } 
        })
        .then(response => {
          this.loadProgress = false
          this.contents = response.body.projects
          this.totalProjectCount = response.body.totalProjectCount
      })
    },
  },
  created () {
    this.fetchData()
  },
}
</script>
<style>
</style>
